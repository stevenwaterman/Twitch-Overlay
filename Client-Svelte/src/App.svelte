<script lang="ts">
import Intro from "./screens/Intro.svelte";
import IntroWithMusic from "./screens/IntroWithMusic.svelte";
import Break from "./screens/Break.svelte";
import SoloFaces from "./screens/SoloFaces.svelte";
import DualFaces from "./screens/DualFaces.svelte";
import SingleGame from "./screens/SingleGame.svelte";
import PriorityGame from "./screens/PriorityGame.svelte";
import Debug from "./screens/debug/Debug.svelte";

import { Router, Link, Route } from "svelte-routing";
import FrontPage from "./screens/FrontPage.svelte";
import FrontpageFaces from "./screens/FrontpageFaces.svelte";

export let url = "";
</script>

<style>
  .links {
    display: flex;
    flex-direction: column;
  }
</style>

<Router url={url}>
  <Route path="/">
    <div class="links">
      <Link to="debug">debug</Link>
      <Link to="intro">intro</Link>
      <Link to="intro/silent">intro/silent</Link>
      <Link to="break">break</Link>
      <Link to="faces/solo">faces/solo</Link>
      <Link to="faces">faces</Link>
      <Link to="faces/frontpage">faces/frontpage</Link>
      <Link to="game/solo/left">game/solo/left</Link>
      <Link to="game/solo/right">game/solo/right</Link>
      <Link to="game/single/left">game/single/left</Link>
      <Link to="game/single/right">game/single/right</Link>
      <Link to="game/priority/left">game/priority/left</Link>
      <Link to="game/priority/right">game/priority/right</Link>
      <Link to="game/frontpage">game/frontpage</Link>
    </div>
  </Route>
  <Route path="intro" component={IntroWithMusic}/>
  <Route path="intro/silent" component={Intro}/>
  <Route path="break" component={Break}/>
  <Route path="faces/solo" component={SoloFaces}/>
  <Route path="faces" component={DualFaces}/>
  <Route path="faces/frontpage" component={FrontpageFaces}/>
  <Route path="game/solo/left"><SingleGame leftCamera="other" rightCamera="hidden"/></Route>
  <Route path="game/solo/right"><SingleGame leftCamera="hidden" rightCamera="other"/></Route>
  <Route path="game/single/left"><SingleGame rightCamera="other"/></Route>
  <Route path="game/single/right"><SingleGame leftCamera="other"/></Route>
  <Route path="game/priority/left"><PriorityGame/></Route>
  <Route path="game/priority/right"><PriorityGame flipX/></Route>
  <Route path="game/frontpage"><FrontPage/></Route>
  <Route path="debug" component={Debug}/>
</Router>