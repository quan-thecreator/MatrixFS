<script lang="ts">
import { FileCopyAltOutline } from "flowbite-svelte-icons";
import { Tooltip } from "flowbite-svelte";
export let text;
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      
    } catch (err) {
     
    }
  }
</script>

<div class="box clearfix" style="width: 60vw; border: 2px solid gray; border-radius:5px;">
  <p style="font-family:monospace; color:lightblue; float: left; padding:5px;">{text}</p>
<FileCopyAltOutline class="w-5 h-5" id="copyicon" style="float:right; padding-right:5px; padding-top:5px;" on:click={copyContent}/> <Tooltip trigger="click" triggeredBy="#copyicon">Copied!</Tooltip></div>
<style>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>

