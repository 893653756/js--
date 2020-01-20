/**
 * 向量模块
 */
export class Vector3 extends Vector3Fun {
    constructor(x, y, z) {
        super();
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

}

class Vector3Fun {
    constructor() { }
    /**
     * 设置第一个分量
     */
    setX(x) {
        this.x = x || 0;
        return this;
    }
    /**
     * 设置第二个分量
     */
    setY(y) {
        this.y = y || 0;
        return this;
    }
    /**
     * 设置第三个分量
     */
    setZ(z) {
        this.z = z || 0;
        return this;
    }
    /**
     * 设置三个分量
     */
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * 向量的模
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * 归一化向量
     * 首先求出向量的长度（模），然后将各个分量除以模即可
     */
    normalize() {
        if (this.length() > 0.00001) {
            this.x = this.x / length;
            this.y = this.y / length;
            this.z = this.z / length;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    }
    /**
     * 向量相加
     */
    addVector(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }
    /**
     * 向量相减
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    }
    /**
     * 向量与标量相乘
     */
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
    /**
     * 向量与向量相乘
     */
    mulitplyVector(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        return this;
    }
}

/**
 * 点乘
 */
Vector3.dot = function (vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z
}
/**
 * 叉乘 
 */
Vector3.cross = function (vec1, vec2) {
    var x = vec1.y * vec2.z - vec2.y * vec1.z;
    var y = vec2.x * vec1.z - vec1.x * vec2.z;
    var z = vec1.x * vec2.y - vec1.y * vec2.x;
    return new Vector3(x, y, z);
};
/**
 * 归一化向量
 * 首先求出向量的长度（模），然后将各个分量除以模即可
 */
Vector3.normalize = function (vec) {
    if (vec.length() > 0.00001) {
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }
    return new Vector3();
};

