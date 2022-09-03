import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // iltreate over the array and return total
  const languages = repos.reduce((total, item) => {
    //  disturcture tha array to get the languages
    const { language, stargazers_count } = item;

    // Check if the property is null and return wth out doing anything if it s null
    if (!language) return total;
    //  To check if the property  has the language property first, if it dpes npt set the lagguage property to 1
    if (!total[language]) {
      total[language] = { lable: language, value: 1, star: stargazers_count };
    } else {
      // copy the object using the spread operator and overite the vaalue and add 1
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        star: total[language].star + stargazers_count,
      };
    }

    return total;
  }, {});

  console.log(languages);

  // convert the object into an Array, and sorth the value property with the highets value and enure its nnot more than 5 using the clice operator
  const MostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.star - a.star;
      // use the map function to find the value of star and put in the value property
    })
    .map((item) => {
      return { ...item, value: item.star };
    })
    .slice(0, 5);

  //stars,folks

  let { star, forks } = repos.reduce(
    (total, item) => {
      // distrucuring the object
      const { stargazers_count, name, forks } = item;
      // reassing values to the stargazers_count in the object
      total.star[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };

      return total;
    },
    { star: {}, forks: {} }
  );

  star = Object.values(star).slice(-5).reverse();

  const chartData = [
    {
      label: "CSS",
      value: "290",
    },
    {
      label: "Javascript",
      value: "260",
    },
    {
      label: "HTML",
      value: "180",
    },
    {
      label: "Iran",
      value: "140",
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={MostUsed}></Pie3D>
        <Column3D data={star}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <ExampleChart data={chartData}></ExampleChart>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
