// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "customizecodesnippet" is now active!');
	console.log('Congratulations, your extension "customizecodesnippet" is now active!');
	console.log('Congratulations, your extension "customizecodesnippet" is now active!');

	// get snippet path
	const config = vscode.workspace.getConfiguration('customizecodesnippet');
	let snippetsPath = config.get<string>('snippetsPath');
	if (!snippetsPath) {
		snippetsPath = path.join(context.extensionPath, 'snippets.json');
	}
	if (fs.existsSync(snippetsPath)) {
		// load snippets
		const snippetsData = fs.readFileSync(snippetsPath, 'utf-8');
		const snippets = JSON.parse(snippetsData);
	
		const provider = vscode.languages.registerCompletionItemProvider('*', {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const completions: vscode.CompletionItem[] = [];
				Object.keys(snippets).forEach((key) => {
					const snippet = snippets[key];
					const completionItem = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
					completionItem.insertText = new vscode.SnippetString(snippet.body.join('\n'));
					completions.push(completionItem);
				});
				return completions;
			}
		});
		context.subscriptions.push(provider);
	}
	else {
		// console.error('[customizecodesnippet] Snippet not found at ${snippetsPath}');
		console.error('[customizecodesnippet] Snippet not found at ');
		// vscode.window.showErrorMessage(`snippets.json not found at: ${snippetsPath}`);
	}




	// const extension = context.extension;
	// if (extension) {
	// 	const extensionPath = extension.extensionPath;
	//	 const packageJsonPath = path.join(extensionPath, 'package.json');
	// 	if (fs.existsSync(packageJsonPath)) {
	// 		// load package json
	//		 const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8');
	//		 const packageJson = JSON.parse(packageJsonData);

	//		 const snippetsPath = packageJson.contributes?.snippets?.[0]?.path;
	// 		if (snippetsPath) {
	// 			const fullSnippetsPath = path.join(extensionPath, snippetsPath);
	// 			if (fs.existsSync(fullSnippetsPath)) {
	// 				// load snippets
	// 				const snippetsData = fs.readFileSync(fullSnippetsPath, 'utf-8');
	// 				const snippets = JSON.parse(snippetsData);
				
	// 				const provider = vscode.languages.registerCompletionItemProvider('*', {
	// 					provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
	// 						const completions: vscode.CompletionItem[] = [];
				
	// 						Object.keys(snippets).forEach((key) => {
	// 							const snippet = snippets[key];
	// 							const completionItem = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);
	// 							completionItem.insertText = new vscode.SnippetString(snippet.body.join('\n'));
	// 							completions.push(completionItem);
	// 						});
				
	// 						return completions;
	// 					}
	// 				});
	// 				context.subscriptions.push(provider);
	// 			}
	// 			else {
	// 				console.error('[customizecodesnippet] Snippet not found');
	// 			}
	// 		}
	// 		else {
	// 			console.error('[customizecodesnippet] Snippet not configured');
	// 		}
	// 	}
	// 	else {
	// 		console.error('[customizecodesnippet] Package json not found');
	// 	}
	// }
	// else {
	// 	console.error('[customizecodesnippet] Extension not found');
	// }
}

// This method is called when your extension is deactivated
export function deactivate() {}
