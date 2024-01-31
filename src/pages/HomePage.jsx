import { NavLink } from "react-router-dom";
import Card from "../components/UI/Card";

function HomePage() {
  const description = `This love story chronicles the lifelong relationship of conductor-composer Leonard Bernstein and actress Felicia Montealegre Cohn Bernstein.`;
  const imgSrc = `https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8YtZXAlbrMCz88ob-_Y3OPzw6MgHCvFIO6Cf5PE0CLxG_CGcA`;
  const button = "Read more";
  const title = "Maestro";
  const link = "/sign-up";
  return (
    <div className="container pt-24 mb-24 ">
      <section className="flex justify-between items-center home">
        <div className="w-2/4">
          <h1 className="mt-20">
            Less stress when choosing a <span>movie.</span>
          </h1>
          <p className=" mt-10 mb-10">
            Keep track of your friends favorite movies, TV series,
            documentaries.
          </p>
          <NavLink
            className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow "}
            to={"/sign-up"}
          >
            Sign up
          </NavLink>
        </div>
        <div className="w-2/4">
          <Card
            title={title}
            description={description}
            imgSrc={imgSrc}
            button={button}
            link={link}
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
