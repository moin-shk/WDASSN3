// pages/test.js
export default function TestPage({ message }) {
    return (
      <div>
        <h1>Test Page</h1>
        <p>{message}</p>
      </div>
    );
  }
  
  export async function getServerSideProps() {
    console.log("getServerSideProps is running for TestPage");
    return {
      props: { message: "Hello, World!" },
    };
  }
  