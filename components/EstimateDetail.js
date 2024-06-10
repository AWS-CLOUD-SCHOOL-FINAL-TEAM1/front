import Link from "next/link";

const estimateDetail = ({ id, title, description }) => {
  return (
    <Link href={`/recommend/${id}`}>
      <div className="p-4 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default estimateDetail;
