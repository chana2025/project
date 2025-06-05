type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return (
    <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
      {title}
    </h1>
  );
};
