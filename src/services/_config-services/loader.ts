import { BehaviorSubject, Observable } from 'rxjs';

export default class Loader {
  private static _instance?: Loader;
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading: Observable<boolean>;

  private constructor() {
    this.isLoading = this._isLoading.asObservable();
  }

  private _toggle = (isLoading: boolean) => () => {
    this._isLoading.next(isLoading);
  };

  public show = this._toggle(true);

  public hide = this._toggle(false);

  public static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public static clearInstance() {
    delete this._instance;
  }
}
