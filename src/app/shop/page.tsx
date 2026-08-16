import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();
  
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  redirect(queryString ? `/collections/all?${queryString}` : `/collections/all`);
}
