export class Utils {
  private constructor() {
  }

  static joinArgumentsConstructorNames(args: IArguments): string {
    return Array.prototype.map.call(args, a => a.constructor.name).join(';');
  }

  static wrongArgumentsException(args: IArguments): Error {
    return new Error(`Wrong arguments: "${Utils.joinArgumentsConstructorNames(args)}"`);
  }

  // tslint:disable-next-line:ban-types
  static functionToString(fnc: Function): string {
    const str = fnc.toString();
    let array = str
      .substring(str.indexOf('{') + 1, str.lastIndexOf('}'))
      .replace('\t', ' ')
      .split('\n');
    array = array
      .filter(l => l.trim() !== '')
      .map(l => l.trim() === '// \\n' ? '' : l);

    let minSpacesCount = Number.MAX_VALUE;
    array
      .filter(l => l.trim() !== '')
      .forEach(l => minSpacesCount = Math.min(minSpacesCount, l.length - l.trimLeft().length));
    array = array.map(l => l.substring(minSpacesCount));
    array.push('');
    return array.join('\n');
  }

  static preventDefaultBehaviour(e: Event): boolean {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
}
