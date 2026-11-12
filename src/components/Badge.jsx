import { cx, BADGE } from '../lib/utils';

export default function Badge({ value }) {
    return (
        <span className={cx('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', BADGE[value])}>
      {value}
    </span>
    );
}