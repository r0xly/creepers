export function getFallOffAtPoint(size: number, x: number, y: number) {
    x = x / size * 2 -1;
    y = y / size * 2 -1;
    
    let value = math.max(math.abs(x), math.abs(y));
    return evaluate(value);
}
export function generateFalloffMap(size: number) {

}

function evaluate(value: number) {
    let a = 3;
    let b = 2.2;

    return math.pow(value, a) / (math.pow(value, a) + math.pow(b - b * value, a));
}