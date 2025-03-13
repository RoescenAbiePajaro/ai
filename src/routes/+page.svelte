<script lang="ts">
    import { onMount } from "svelte";
    import MarkdownIt from "markdown-it";
  
    let response = "";
    let md = new MarkdownIt();
  
    onMount(async () => {
      try {
        const request = await fetch("http://localhost:5173/api2/generate");
        const apiResponse = await request.json();
        response = apiResponse?.message?.content || "";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  </script>
  
  <div class="p-4">
    <div class="rounded p-4 bg-blue-200 shadow">
      {@html md.render(response)}
    </div>
  </div>
  