import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Front-end software engineer & UI/UX designer",
};

function AboutPage() {
  return (
    <div>
      <h2 className="!mt-0">Hello again!</h2>
      <div className="h-5" />
      <p>
        {`About this app... coming soon.
        `}
      </p>
    </div>
  );
}

export default AboutPage;
