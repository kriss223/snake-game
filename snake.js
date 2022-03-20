class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


function Snake() {
    this.x = 15;
    this.y = 15;
    this.xspeed = 0;
    this.yspeed = 0;
    this.xapple = 10;
    this.yapple = 10;

    this.total = 2;
    this.snakeParts = [];


    this.apple = function () {
        if (this.xapple === this.x && this.yapple === this.y) {
            this.xapple = Math.floor(Math.random()*tileCount)
            this.yapple = Math.floor(Math.random() * tileCount)
            for (let i = 0; i < s.snakeParts.length; i++) {
                let part = s.snakeParts[i];
                if (part.x === this.xapple && part.y === this.xapple) {
                    this.xapple = Math.floor(Math.random()*tileCount)
                    this.yapple = Math.floor(Math.random() * tileCount)
                }
            }
            this.total++;
            score++;
        }

        ctx.fillStyle = "red";
        ctx.fillRect(this.xapple*scl, this.yapple*scl, sclx-2, scly-2);
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }


    this.update = function () {
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }

    this.show = function () {
        ctx.fillStyle = "green";
        ctx.strokeStyle = 'red';
        for (let i = 0; i < this.snakeParts.length; i++){
            let part = this.snakeParts[i]
            ctx.fillRect(part.x*scl, part.y*scl, sclx-2, scly-2);
        }
        this.snakeParts.push(new SnakePart(this.x, this.y))        
        while (this.snakeParts.length > this.total) {
            this.snakeParts.shift()
        }
        
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x*scl, this.y*scl, sclx-2, scly-2);

    }



}