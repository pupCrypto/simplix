class A {
    constructor() {
        this.b()
    }
}

class B extends A {
    b() {
        console.log('b');
    }
}

new B();