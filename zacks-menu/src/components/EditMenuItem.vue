<template>
    <div v-if="menuItem" class="edit-menu-item container">
        <h2 class="center-align white-text">Edit {{menuItem.title}} Menu </h2>
    <form @submit.prevent="EditMenuItem">
        <div class="field title">
            <label for="title" class="deep-orange-text ">Menu Item Name: </label>
            <input type="text" name="title" class="white-text" v-model="menuItem.title"/>

        </div>
        <div class="field description">
            <label for="description" class="deep-orange-text ">Description: </label>
            <input type="text" class="white-text description-text" name="description" v-model="menuItem.description"/>
        </div>
        <div v-for="(ingredient, index) in menuItem.ingredients" :key="index" class="field">
            <label for="ingredient" class="deep-orange-text">Ingredient: </label>
            <input type="text" name="ingredient" class="white-text" v-model="menuItem.ingredients[index]"/>
            <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient" class="deep-orange-text ">Add an ingredient: </label>
            <input type="text" name="add-ingredient" class="white-text" @keydown.tab.prevent="addIngredient" v-model="another"/>
            <a class="btn-floating btn-small right added green darken-2"><i class="tiny material-icons" @click="addIngredient">add</i></a>
        </div>
        
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{ feedback}}</p>
            <button class="btn orange darken-4 right">Update Menu Item</button>
        </div>
    </form> 
    </div>
</template>
<script>
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditMenuItem',
    data(){
        return{
            menuItem: null,
            another: null,
            feedback: null
        }
    },
    methods:{
        addIngredient(){
            if(this.another){
                this.menuItem.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIngredient(ingredient){
            this.menuItem.ingredients = this.menuItem.ingredients.filter(ingr =>{
                return ingr != ingredient
            })
        },
        EditMenuItem(){
            if(this.menuItem.title){
                this.feedback = null
                //create a slug
                this.menuItem.slug = slugify(this.menuItem.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                database.collection('Menu').doc(this.menuItem.id).update({
                    title: this.menuItem.title,
                    ingredients: this.menuItem.ingredients,
                    slug: this.menuItem.slug
                }).then(() =>{
                    this.$router.push({name: 'Index'})
                }).catch(error =>{
                    console.log(error)
                })
            }
            else{
            this.feedback = 'You must enter a Menu Item Name!'
            }
        }
    },
    created(){
        let ref = database.collection('Menu').where('slug', '==', this.$route.params.menuItem_slug)
        ref.get().then(snapshot =>{
            snapshot.forEach(document =>{
                this.menuItem = document.data()
                this.menuItem.id = document.id
            })
        })
    }
}
</script>
<style>
.edit-menu-item{
    margin-top: 30px;
    padding: 10px;
    max-width: 60%;

}
.edit-menu-item h2{
    font-size: 2em;
    margin: 20px auto;
    
}
.edit-menu-item .field{
    margin: 20px auto;
    position: relative;
}
button{
    margin-bottom: 20px;
}
.edit-menu-item .added{
    position: absolute;
    right: 0px;
    bottom: 25px;
    font-size: 1.5em;
    cursor: pointer;
}
.edit-menu-item .delete{
    position: absolute;
    right: 0px;
    bottom: 25px;
    color: red;
    font-size: 1.5em;
    cursor: pointer;
}

</style>