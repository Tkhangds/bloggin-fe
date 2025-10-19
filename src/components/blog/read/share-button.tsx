import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";

export default function ShareButton() {
  return (
    <div className={"flex items-center gap-1"}>
      <FacebookShareButton
        url={window.location.href}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LinkedinShareButton url={window.location.href}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}
