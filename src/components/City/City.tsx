import "./City.css";

type CityProps = {
  name: string;
  isRemoved: boolean;
  textColor: string;
  background: string;
};

const City: React.FC<CityProps> = ({
  name,
  isRemoved,
  textColor,
  background,
}) => {
  return (
    <div
      className={`city ${isRemoved ? "" : ""} ${textColor}`}
      style={{ backgroundColor: background }}
    >
      {name}
    </div>
  );
};

export default City;
export type { CityProps };
