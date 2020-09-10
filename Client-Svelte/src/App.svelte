<script lang="ts">
import AlertController from "./alerts/AlertController.svelte";
import Chat from "./chat/Chat.svelte";
import Intro from "./screens/Intro.svelte";
import IntroWithMusic from "./screens/IntroWithMusic.svelte";
import Break from "./screens/Break.svelte";
import SoloFaces from "./screens/SoloFaces.svelte";
import DualFaces from "./screens/DualFaces.svelte";
import SingleGame from "./screens/SingleGame.svelte";
import PriorityGame from "./screens/PriorityGame.svelte";

import { Router, Route } from "svelte-routing";

export let url = "";
</script>

<Router url={url}>
  <div>
    <Route path="intro" component={IntroWithMusic}/>
    <Route path="intro/silent" component={Intro}/>
    <Route path="break" component={Break}/>
    <Route path="faces/solo" component={SoloFaces}/>
    <Route path="faces" component={DualFaces}/>
    <Route path="game/solo/left"><SingleGame leftCamera="other" rightCamera="hidden"/></Route>
    <Route path="game/solo/right"><SingleGame leftCamera="hidden" rightCamera="other"/></Route>
    <Route path="game/single/left"><SingleGame rightCamera="other"/></Route>
    <Route path="game/single/right"><SingleGame leftCamera="other"/></Route>
    <Route path="game/priority/left"><PriorityGame/></Route>
    <Route path="game/priority/left"><PriorityGame flipX/></Route>
  </div>
</Router>

<!-- <Break/> -->
<!-- <Intro/> -->
<!-- <IntroWithMusic/> -->
<!-- <Chat/> -->
<!-- <AlertController/> -->
<!-- <SoloFaces/> -->
<!-- <DualFaces/> -->
<!-- <PriorityGame/> -->
<!-- <SingleGame/> -->