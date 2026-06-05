import "./SlideTile.css";

type SlideTileProps = {
  imageSrc: string;
  imageAlt: string;
  slideTitle: string;
};

export default function SlideTile({
  imageSrc,
  imageAlt,
  slideTitle,
}: SlideTileProps) {
  return (
    <section className="slide-tile">
      <h3>{slideTitle}</h3>
      <img className="slide-tile__image" src={imageSrc} alt={imageAlt} />
    </section>
  );
}
