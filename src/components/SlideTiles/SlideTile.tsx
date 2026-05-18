import "./SlideTile.css";

type SlideTileProps = {
  imageSrc: string;
  imageAlt: string;
};

export default function SlideTile({ imageSrc, imageAlt }: SlideTileProps) {
  return (
    <section className="slide-tile">
      <img className="slide-tile__image" src={imageSrc} alt={imageAlt} />
    </section>
  );
}
