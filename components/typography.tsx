export const Heading1 = ({
  className,
  ...props
}: { className?: string } & any) => (
  <h1 className={`text-6xl my-4 ${className}`} {...props} />
);

export const Heading2 = (props) => (
  <h2
    className="mb-4 text-4xl md:text-4xl font-bold tracking-tighter leading-tight"
    {...props}
  />
);
