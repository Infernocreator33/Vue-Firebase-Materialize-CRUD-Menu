<template>
    <div class="navbar">
        <nav class="nav-extended orange darken-4">
            <div class="nav-content">
                <router-link :to="{name: 'Index'}">
                    <span class="nav-title white-text"><b>Sexton Family Menu</b></span>
                </router-link>
                
                    <router-link :to="{name: 'AddMenuItem'}">
                        <span class="btn-floating btn-large halfway-fab green darken-2">
                        <i class="material-icons">add</i>
                        </span>
                    </router-link>
                
            </div>
        </nav>
    </div>  
</template>
<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }
}
</script>
<style>
.navbar{
    padding: 0 20px;
    
}
span.nav-title{
    padding-left: 20px;
}
.material-icons {
  font-family: 'Material Icons' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;

  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
@font-face {
  font-family: 'Material Icons' !important;
  font-style: normal;
  font-weight: 400;
  src: url(/public/dist/font/Material-Design-Icons.eot); /* For IE6-8 */
  src: url(/public/dist/font/Material-Design-Icons.woff2) format('woff2'),
       url(/public/dist/font/Material-Design-Icons.woff) format('woff'),
       url(/public/dist/font/Material-Design-Icons.ttf) format('truetype');
}
</style>