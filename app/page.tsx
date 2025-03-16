import TitlePage from "@/common/title/TitlePage";
import HomepageComponent from "@/components/homepage/HomepageComponent";

export default function Home() {
	return <div className="min-h-screen flex flex-col">
		<TitlePage text="การนัดหมายแพทย์"/>
		<HomepageComponent/>
	</div>
}
