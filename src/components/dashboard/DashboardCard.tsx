import Link from "next/link";

const DashboardCard = ({
  id,
  title,
  content,
  from,
}: {
  id: string;
  title: string;
  content: string | null;
  from: string;
}) => {
  return (
    <div className="card  animate-fade-up">
      <div className="flex items-start gap-4">
        {/* <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" /> */}
        <div className="w-full flex flex-col gap-3 md:gap-2 text-sm md:text-base overflow-hidden">
          <h3 className="font-medium ">{title.slice(0, 100)}</h3>
          <p className="text-secondary break-all ">{from}...</p>
          <p className="text-secondary truncate text-wrap">
            {content?.slice(0, 150)}...
          </p>
          <Link
            href={"/emaildetails/" + id}
            className="btn btn-secondary w-fit self-end"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;