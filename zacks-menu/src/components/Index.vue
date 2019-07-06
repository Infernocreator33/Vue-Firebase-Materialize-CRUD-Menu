<template>
  <div class="index">

    <div class="card-container">
    <div class="card green darken-2" v-for="item in menuItems" :key="item.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteMenuItem(item.id)">delete</i>
        <h2 class="white-text center">{{item.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingr, index) in item.ingredients" :key="index">
          <span class="chip green lighten-3 indigo-text">{{ingr}}</span>
          </li>
        </ul>
        <p class="description white-text">Description: {{item.description}}</p>
      </div>
      <span class="btn-floating btn-large halfway-fab orange darken-4">
        <router-link :to="{name: 'EditMenuItem', params: {menuItem_slug: item.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
    </div>
       <footer class="green darken-2 page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Product of Zachary Sexton</h5>
                <p class="white-text">You can add items to the menu if you would choose to show that you've been to my page!</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Menu Categories</h5>
                <ul>
                  <li><a class="white-text" href="#!">Drinks</a></li>
                  <li><a class="white-text" href="#!">Breakfast</a></li>
                  <li><a class="white-text" href="#!">Lunch/Dinner</a></li>
                  <li><a class="white-text" href="#!">Kids</a></li>
                  <li><a class="white-text" href="#!">Desserts</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="orange darken-4 white-text footer-copyright">
            <div class="container">
            © Zachary Sexton June 2019
            <a class="white-text right" href="https://github.com/Infernocreator33/">Github</a>
            <a class="white-text right" href="https://www.linkedin.com/in/zachary-sexton33/">LinkedIn</a>

            
            </div>
          </div>
        </footer>
  </div>
</template>
<script>
import database from '@/firebase/init'
export default {
  name: 'Index',
  data(){
    return{
      menuItems: []
    }
  },
  methods: {
    deleteMenuItem(id){
      //delete document from firestore collection
      database.collection('Menu').doc(id).delete().then(() =>{
      this.menuItems = this.menuItems.filter(item =>{
        return item.id != id  //if false not in array if true is in the array
      })
      })

    }
  },
  created(){
    //fetch data from firestore
    database.collection('Menu').get().then(snapshot =>{
      snapshot.forEach(document =>{
        let menuItem = document.data()
        menuItem.id = document.id
        this.menuItems.push(menuItem)
      })
    })
  }
}
</script>
<style>
html{
  background-color: indigo;
}
.card-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  
}

.index h2{
  font-size: 1.8em;
  margin-top: 0px;
}
.index .indgredients{
  margin: 20px auto;
}
.index .ingredients li{
  display: inline-block;
  
}
.card{

  min-width: 25%;
  max-width: 30%;
  margin-right: 20px;
  margin-bottom: 40px;
  min-height: 20%;

}
.index .delete{
  position: absolute;
  cursor: pointer;
  top: 4px;
  right: 4px;
  color: red;
  
}

a{
  padding-right: 10px;
}


@media screen and (max-width: 925px)  {
  .card{
    min-width: 100%;
  }
}
</style>
