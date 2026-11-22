declare module '@tensorflow/tfjs' {
  export interface LayersModel {
    predict(inputs: any, config?: any): any;
  }
  export interface Tensor {
    data(): Promise<Float32Array | Int32Array | Uint8Array>;
    dataSync(): Float32Array | Int32Array | Uint8Array;
    dispose(): void;
    shape: number[];
  }
  export function setBackend(backendName: string): Promise<boolean>;
  export function ready(): Promise<void>;
  export function getBackend(): string;
  export function loadLayersModel(pathOrIOHandler: string | any, options?: any): Promise<LayersModel>;
  export function zeros(shape: number[], dtype?: string): Tensor;
  export function tensor3d(values: any, shape?: [number, number, number], dtype?: string): Tensor;
  export const version: any;
}
