import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import slideIcon from "../../assets/slide-icon.webp";
import "./InstagramLink.css";

type InstagramLinkProps = {
  href: string;
};

export default function InstagramLink({ href }: InstagramLinkProps) {
  return (
    <a
      className="instagram-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Instagram profile"
    >
      <img
        src={slideIcon}
        alt=""
        className="instagram-link__image-icon"
        aria-hidden="true"
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="instagram-link__icon instagram-link__icon--plane"
        aria-hidden="true"
      />
      {/* <FontAwesomeIcon
        icon={faInstagram}
        className="instagram-link__icon"
        aria-hidden="true"
      /> */}
    </a>
  );
}
