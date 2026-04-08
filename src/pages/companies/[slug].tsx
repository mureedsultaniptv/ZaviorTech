import type { GetServerSideProps } from "next";
import { companies } from "@/lib/data/demo-data";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const company = companies.find((item) => item.slug === slug);

  if (!company) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: company.href,
      permanent: true,
    },
  };
};

export default function CompanyDetailPage() {
  return null;
}
