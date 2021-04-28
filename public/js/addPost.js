const addpostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Post successful!");
      document.location.replace("/");
    } else {
      alert("Post unsuccessful!");
    }
  }
};

document
  .querySelector(".addpost-form")
  .addEventListener("submit", addpostFormHandler);
