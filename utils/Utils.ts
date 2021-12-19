module Utils{
    export function isArray(arr: any): arr is Array<any> {
        return !!arr.length;
    }
}