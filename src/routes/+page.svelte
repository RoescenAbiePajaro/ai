<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import MarkdownIt from 'markdown-it';

  let response = $state("")
  const md = new MarkdownIt();

  onMount(async () => {
    const request = await fetch("http://localhost:5173/api2/generate")
      const apiResponse = await request.json ();
      response = apiResponse?.message?.content || ""
  });
  </script>

<div class="p-4">
    <div class = "rounded p-4 bg-blue-200 shadow-md">
        {md.render(response)}
    </div>
</div> -->

<script>
  import { onMount } from "svelte";

  /**
	 * @type {any[]}
	 */
  let messages = [];
  let inputMessage = "";
  let darkMode = false;

  onMount(() => {
    darkMode = localStorage.getItem("theme") === "dark";
    updateTheme();
  });

  function toggleTheme() {
    darkMode = !darkMode;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    updateTheme();
  }

  function updateTheme() {
    document.body.classList.toggle("dark", darkMode);
  }

  async function sendMessage() {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    inputMessage = "";
    messages = [...messages, { text: userMessage, type: "user" }];

    try {
      const res = await fetch("/api2/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) throw new Error(`Server Error: ${res.status}`);

      const data = await res.json();
      messages = [...messages, { text: data.response, type: "bot" }];
    } catch (error) {
      console.error("Fetch error:", error);
      messages = [...messages, { text: "Error connecting to server.", type: "bot" }];
    }
  }
</script>

<main>
  <button class="theme-toggle" on:click={toggleTheme}>
    {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
  </button>

  <div class="chatbox">
    {#each messages as msg}
      <div class={msg.type === "user" ? "user-message" : "bot-message"}>
        {msg.text}
      </div>
    {/each}
  </div>

  <div class="input-area border rounded-2xl flex items-center p-2 space-x-2">
    <input
      type="text"
      bind:value={inputMessage}
      on:keydown={(e) => e.key === "Enter" && sendMessage()}
      placeholder="Say Hello..."
      class="flex-1 p-2 outline-none placeholder-gray"
    />
    <button on:click={sendMessage} class="px-4 py-2 rounded-lg bg-blue-500 text-white">
      Send
    </button>
  </div>
</main>

<style>
  :global(body) {
    transition: background 0.3s, color 0.3s;
  }

  :global(body.dark) {
    background: #121212;
    color: #fff;
  }

  :global(body.light) {
    background: #f4f4f4;
    color: #000;
  }

  main {
    max-width: 500px;
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .theme-toggle {
    align-self: flex-end;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem;
    color: gray;
  }

  :global(body.dark) .theme-toggle {
    color: white;
  }

  .chatbox {
    height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  :global(body.dark) .chatbox {
    background: #1e1e1e;
  }

  :global(body.light) .chatbox {
    background: #fff;
  }

  .user-message, .bot-message {
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 75%;
    word-wrap: break-word;
  }

  .user-message {
    background: #007aff;
    color: white;
    align-self: flex-end;
  }

  .bot-message {
    background: #ddd;
    color: black;
    align-self: flex-start;
  }

  :global(body.dark) .bot-message {
    background: #444;
    color: white;
  }

  .input-area {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex-grow: 1;
    padding: 0.8rem;
    border-radius: 20px;
    border: none;
    outline: none;
    font-size: 1rem;
    background: none;
  }

  input::placeholder {
    color: gray;
  }

  :global(body.dark) input::placeholder {
    color: white;
  }

  button {
    padding: 0.8rem 1.5rem;
    border-radius: 20px;
    border: none;
    background: #007aff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background: #005ecb;
  }

  @media (max-width: 500px) {
    main {
      padding: 0.5rem;
    }

    .chatbox {
      height: 300px;
    }

    input, button {
      font-size: 0.9rem;
      padding: 0.7rem;
    }
  }
</style>
