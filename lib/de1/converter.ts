export default abstract class Converter {
  public abstract decode(data: DataView): any;
  public abstract encode(newState: any): DataView;
}
