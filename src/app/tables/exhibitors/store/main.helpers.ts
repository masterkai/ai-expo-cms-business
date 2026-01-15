import { Selected_Exhibition_rights } from "./main.slice";
import { Option } from "../../../services/exhibition-rights-service";

export function getHighestSponsorship(selectedExhibitionRight: Selected_Exhibition_rights) {
	if (!selectedExhibitionRight) return null;

	// 優先順序：鑽石 > 白金 > 黃金 > 銀級
	const priorities = [
		{ key: '鑽石', label: '鑽石贊助' },
		{ key: '白金', label: '白金贊助' },
		{ key: '黃金', label: '黃金贊助' },
		{ key: '銀級', label: '銀級贊助' }
	];

	// 只取 lecture 和 stage 的 option 字串
	const options: string[] = [];
	const pushOptions = (arr: Option[]) => {
		if (Array.isArray(arr)) {
			arr.forEach(item => {
				if (item) options.push(item.option);
			});
		}
	};
	pushOptions(selectedExhibitionRight.lecture);
	pushOptions(selectedExhibitionRight.stage);

	if (options.length === 0) return null;

	// 依優先順序找出第一個匹配的等級
	for (const p of priorities) {
		if (options.some(opt => opt.includes(p.key))) return p.label;
	}
	return null;
}