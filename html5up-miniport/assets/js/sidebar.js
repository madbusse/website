document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("poem-sidebar");
  const content = document.getElementById("poem-content");
  const toggleBtn = document.getElementById("poem-toggle");
  const closeBtn = document.getElementById("close-sidebar");

  // Function to fetch and display the poem
  async function loadPoem() {
    try {
      const res = await fetch("https://poetrydb.org/random"); // using poetrydb API for random poem
      const data = await res.json();
      const poem = data[0];
      content.innerHTML = `
        <h3>${poem.title}</h3>
        <p><em>by ${poem.author}</em></p>
        <pre>${poem.lines.join('\n')}</pre>
      `;
    } catch (err) {
      content.innerHTML = "<p>Could not load poem. Please try again later.</p>";
    }
  }

  // Open sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
    sidebar.classList.remove("hidden");
    loadPoem();
  });

  // Close sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    sidebar.classList.add("hidden");
  });

  // Optional: auto-show sidebar on page load
//   sidebar.classList.add("show");
//   loadPoem();
});