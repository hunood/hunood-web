export default (() => {
    /* API Storage */
    const _setItem = Storage.prototype.setItem;
    const _getItem = Storage.prototype.getItem;
    const _removeItem = Storage.prototype.removeItem;
    const _clear = Storage.prototype.clear;

    if (window.Storage.prototype) {
        Storage.prototype.setItem = function (key: string, value: string): void {
            if (key.includes('@Auth:')) {
                _setItem.apply(this, [key, value]);
                return;
            }
            const id = JSON.parse(localStorage.getItem('@Auth:auth') || '{}').id || '';
            _setItem.apply(this, [`${id}_${key}`, value]);

        }

        Storage.prototype.getItem = function (key: string): string | null {
            if (key.includes('@Auth:')) {
                return _getItem.apply(this, [key]);
            }

            const id = JSON.parse(localStorage.getItem('@Auth:auth') || '{}').id || '';
            return _getItem.apply(this, [`${id}_${key}`]);
        }

        Storage.prototype.removeItem = function (key: string): void {
            if (key.includes('@Auth:')) {
                _removeItem.apply(this, [key]);
                return;
            }

            const id = JSON.parse(localStorage.getItem('@Auth:auth') || '{}').id || '';
            _removeItem.apply(this, [`${id}_${key}`]);
        }

        Storage.prototype.clear = function (): void {
            _clear.apply(this, []);
        }

        Storage.prototype.hasItem = function (key: string): boolean {
            const id = JSON.parse(localStorage.getItem('@Auth:auth') || '{}').id || '';
            return _getItem.apply(this, [`${id}_${key}`]) !== null;
        }
    }
})();
