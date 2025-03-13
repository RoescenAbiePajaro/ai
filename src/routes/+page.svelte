<script lang="ts">
  import { onMount } from 'svelte';
  import MarkdownIt from 'markdown-it';

  let response = $state("")
  const md = new MarkdownIt();

  onMount(async () => {
    const request = await fetch("https://localhost:5173/api2/generate")
      const apiResponse = await request.json ();
      response = apiResponse?.message?.content || ""
  });
  </script>

<div class="p-4">
    <div class = "rounded p-4 bg-blue-200 shadow-md">
        {md.render(response)}
    </div>
</div>