/**
 * Created by Ev on 04.07.2017.
 */
Vue.component('VueListe',{
    props:
        {
            liste:{type:Array, required:true},
            isEdit:{type:Boolean,required:true},
        },
    methods:{

            veriGonder:function(){
                console.clear();
                console.log(this.liste);
                console.log("----");
                console.log(JSON.stringify(this.liste));

                fetch('http://localhost:44760/api/default', {
                    method: 'post',
                    headers: {

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.liste)
                }).then((res)=>{console.log(res.json())});



            }



    },

    computed:{
        ortalama:function() {


         return this.liste.map(function (item) {
                let ort=(parseInt(item.Y1)+parseInt(item.Y2)+parseInt(item.Y3))/3;
                return ort.toFixed(2);
            })


        },
        sortalama(){
            let ort=[];
            let t1=t2=t3=t4=0;

            this.liste.forEach(function (item) {
                t1+=parseInt(item.Y1);
                t2+=parseInt(item.Y2);
                t3+=parseInt(item.Y3);

            });
            let n=this.liste.length;
            ort.push((t1/n).toFixed(2));
            ort.push((t2/n).toFixed(2))
            ort.push((t3/n).toFixed(2))
            ort.push(((t1+t2+t3)/(3*n)).toFixed(2));

            return  ort;








        }



    },


    template:`
        <div class="liste-wrapper">
            <div class="sec">
                    <input type="checkbox" name="edit" v-model="isEdit" value="edit" >Değer değiştir...
                    <button v-on:click="veriGonder()">Konsola veri yaz</button>
                    
                    
            </div>
            <table class="veri-liste">
                <thead>
                    <tr>
                    
                        <td>No</td>
                        <td>Ad</td>
                        <td>Y1</td>
                        <td>Y2</td>
                        <td>Y3</td>
                        <td>ort</td>
                    </tr>                
                </thead>
                <tbody >
         
                     <tr v-if="!isEdit" v-for="(item,index) in liste">
                        
                        
                        <td>{{item.SNO}}</td>
                        <td>{{item.Ad}}</td>
                        <td>{{item.Y1}}</td>
                        <td>{{item.Y2}}</td>
                        <td>{{item.Y3}}</td>
                        <td>{{ortalama[index]}}</td>               
                    </tr>   
                     <tr v-if="isEdit" v-for="(item,index) in liste">
                        
                        
                        <td><input v-model.number="item.SNO"   min="0" disabled></td>
                        <td><input v-model="item.Ad"    min="0" ></td>
                        <td><input v-model.number="item.Y1"   min="0" max="100"></td>
                        <td><input v-model.number="item.Y2"   min="0" max="100"></td>
                        <td><input v-model.number="item.Y3"   min="0" max="100"></td>
                        <td>{{ortalama[index]}}</td>               
                    </tr>     
                 </tbody>
                 <tfoot>
                        
                        <td></td>
                        <td></td>
                        <td>{{sortalama[0]}}</td>
                        <td>{{sortalama[1]}}</td>
                        <td>{{sortalama[2]}}</td>
                        <td>{{sortalama[3]}}</td>   
                 
                </tfoot>
            
            </table>
        
        
        </div>`

});


window.addEventListener('load', () => {

    window.vue = new Vue({
    el: '#app',
    name: 'liste',
    data: {
        isEdit: true,
        veri:[]

    },
    methods: {
        handleEditChange(displayType) {
                //***//

        }
    },
    created(){
        fetch('http://localhost:44760/api/default/liste')
            .then((res) => { return res.json() })
    .then((res) => {
            this.isLoading = false;
            this.veri=res;
            console.log(this.veri);
            console.log(res);



    })
    }
})

});
