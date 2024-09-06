import Image from 'next/image';

type Props = {
  className?: string;
};
export const Logo = ({ className }: Props) => {
  return (
    <div className="bg-white rounded-full w-fit">
      <Image
        src="/images/oau-logo.png"
        alt="oau-logo"
        width={150}
        height={150}
        className={className}
      />
    </div>
  );
};
