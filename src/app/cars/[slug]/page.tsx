import React from "react";
import { notFound } from "next/navigation";
import { CARS } from "@/data/cars";
import { CarDetail } from "@/components/CarDetail";
import { Metadata } from "next";

export async function generateStaticParams() {
  return CARS.map((car) => ({
    slug: car.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);
  if (!car) return { title: "Vehicle Not Found | Nova Car" };

  return {
    title: `${car.brand} ${car.model} (${car.year}) | Nova Car`,
    description: car.tagline || car.description.slice(0, 160),
    openGraph: {
      title: `${car.brand} ${car.model} | Nova Car`,
      description: car.tagline,
      images: [car.images.hero],
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  return <CarDetail car={car} />;
}
