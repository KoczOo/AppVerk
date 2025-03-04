import {Injectable, Signal, signal, WritableSignal} from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    readonly #loaderState: WritableSignal<boolean> = signal<boolean>(false);

    readonly loaderState: Signal<boolean> = this.#loaderState.asReadonly();

    changeLoaderState(loaderState: boolean) {
        this.#loaderState.update(() => loaderState);
    }

}
