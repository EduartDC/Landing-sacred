// Type declarations for @barba/core
declare module "@barba/core" {
	interface ITransitionData {
		current: {
			container: HTMLElement;
			url: string;
			namespace: string;
		};
		next: {
			container: HTMLElement;
			url: string;
			namespace: string;
		};
		trigger: string;
	}

	interface ITransition {
		name?: string;
		from?: string | object;
		to?: string | object;
		leave?: (data: ITransitionData) => Promise<void>;
		enter?: (data: ITransitionData) => Promise<void>;
		beforeLeave?: (data: ITransitionData) => Promise<void>;
		afterEnter?: (data: ITransitionData) => Promise<void>;
	}

	interface IBarbaOptions {
		transitions?: ITransition[];
		views?: any[];
		debug?: boolean;
		timeout?: number;
		cacheIgnore?: boolean;
	}

	interface IBarba {
		init(options: IBarbaOptions): void;
		go(url: string, options?: { transition?: string }): Promise<void>;
		destroy(): void;
		running: boolean;
	}

	const barba: IBarba;
	export default barba;
}
