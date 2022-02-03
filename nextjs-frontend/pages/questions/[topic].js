function Topic({ data }) {
  return (
    <div>
      {data.map((question) => {
        return <p>{question.question}</p>;
      })}
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const res = await fetch('http://local/posts')
  // const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  // let paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths: [
      { params: { topic: "frontend" } },
      { params: { topic: "backend" } },
    ],
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `http://localhost:5000/questions?topic=${params.topic}`
  );
  const post = await res.json();
  const data = post.payload;
  // Pass post data to the page via props
  return { props: { data } };
}

export default Topic;
