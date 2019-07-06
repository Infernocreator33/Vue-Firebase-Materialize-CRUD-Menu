<template>
<div class="add-menu-item container">
    <h2 class="center-align white-text">Add New Menu Item</h2>  
    <form @submit.prevent="AddMenuItem">
        <div class="field title">
            <label for="title" class="deep-orange-text ">Menu Item Name: </label>
            <input type="text" class="white-text" name="title" v-model="title"/>

        </div>
        <div class="field description">
            <label for="description" class="deep-orange-text ">Description: </label>
            <input type="text" class="white-text description-text" name="description" v-model="description"/>
        </div>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
            <label for="ingredient" class="deep-orange-text">Ingredient: </label>
            <input type="text" name="ingredient" class="white-text" v-model="ingredients[index]"/>
            <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient" class="deep-orange-text ">Add an ingredient: </label>
            <input type="text" name="add-ingredient" class="white-text" @keydown.tab.prevent="addIngredient" v-model="another"/>
            <a class="btn-floating btn-small right added green darken-2"><i class="tiny material-icons" @click="addIngredient">add</i></a>
        </div>
        
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <button class="btn orange darken-4 right">Add Menu Item</button>
        </div>
    </form>  
</div>
</template>
<script>
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddMenuItem',
    data(){
        return{
            title: null,
            another: null,
            description: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddMenuItem(){
            if(this.title)
            {
                this.feedback = null;
                //create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true,
                })
                database.collection('Menu').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug,
                    description: this.description
                }).then(() =>{
                    this.$router.push({name: 'Index'})
                }).catch(error =>{
                    console.log(error)
                })
            }
            else{
                this.feedback = 'You must enter a Menu Item Name!'
            }
        },
        addIngredient(){
            if(this.another)
            {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }
            else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIngredient(ingredient){
            this.ingredients = this.ingredients.filter(ing =>{
                return ing != ingredient
            })
        }
    }
}
</script>
<style>
.add-menu-item{
    margin-top: 30px;
    padding: 10px;
    max-width: 60%;

}
button{
    margin-bottom: 20px;
}
.add-menu-item h2{
    font-size: 2em;
    margin: 20px auto;
    
}
.add-menu-item .field{
    margin: 20px auto;
    position: relative;
    
}
.add-menu-item .added{
    position: absolute;
    right: 0px;
    bottom: 25px;
    font-size: 1.5em;
    cursor: pointer;
}
.add-menu-item .delete{
    position: absolute;
    right: 0px;
    bottom: 25px;
    color: red;
    font-size: 1.5em;
    cursor: pointer;
}

</style>