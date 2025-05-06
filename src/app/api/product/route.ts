// app/api/product/route.ts
import prisma from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
      minPrice,
      maxPrice,
      status = "PUBLISHED",
    } = body;

    const skip = (page - 1) * limit;

    const where = {
      status,
      ...(minPrice !== undefined && maxPrice !== undefined
        ? { price: { gte: minPrice, lte: maxPrice } }
        : minPrice !== undefined
        ? { price: { gte: minPrice } }
        : maxPrice !== undefined
        ? { price: { lte: maxPrice } }
        : {}),
    };

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        select : {
          id: true,
          name: true,
          price: true,
          assets : {
            select : {
              asset_url: true,
            }
          },
          discountPrice: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        cacheStrategy: { ttl: 60 },
      }, 
    ),
      prisma.product.count({ 
        where,
        cacheStrategy: { ttl: 60 },
      }),
    ]);
      return NextResponse.json({
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
        },
      }, {
        headers: {
          'Cache-Control': 's-maxage=600, stale-while-revalidate=30'
        }
      });
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
