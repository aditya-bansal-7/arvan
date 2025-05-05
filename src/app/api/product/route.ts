// app/api/product/route.ts
import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

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
        include: { assets: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
