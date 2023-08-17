import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner variant="primary" size="lg" className="duration-700" />
    </div>
  );
}
