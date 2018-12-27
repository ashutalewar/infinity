import {observable, action, computed} from 'mobx';


class BirsStore{
    @observable birds = [];

    @action addBird = (bird)=>{
        this.bird.push(bird);
    }

    @computed get birdCount(){
        return this.birds.length
    }
}

const store = new BirsStore();
export default store;