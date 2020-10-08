// import React from "react";
import { GetServerSideProps } from 'next';


type Props = { competitions: object[] };

export const Page = (props: Props) => {
  console.log(props);
  return null;
}
export default Page;



export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query;
  const results = [];

  if (q) {
    let resultsSize = 0;
    let i = 0;

    while (i < TOTAL_COUNT && resultsSize < MAX_RESULTS) {
      const competition = competitions[i];
      if (matchesQuery(String(q), competition)) {
        results.push(competition);
        resultsSize += 1;
      }
      i += 1;
    }
  }

  return {
    props: { competitions: results },
  }
}
