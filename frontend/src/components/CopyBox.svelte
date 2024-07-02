<script lang="ts">
import { FileCopyAltOutline } from "flowbite-svelte-icons";
import { Tooltip } from "flowbite-svelte";
import { Input, Label, Helper } from 'flowbite-svelte';
export let text;

</script>

<div>
  <Label class="space-y-2">
  <span>Hash to be used with other matrixfs clients</span>
  <Input type="text" placeholder="MatrixFS Hash" size="md" disabled bind:value={text}/>
</Label>
</div>
