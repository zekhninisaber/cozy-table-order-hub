
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation, type Language } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const { language, setLanguage, tableNumber } = useAppStore();
  const t = useTranslation(language);
  const navigate = useNavigate();
  
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'en', name: t('english'), flag: '🇬🇧' },
    { code: 'nl', name: t('dutch'), flag: '🇳🇱' }
  ];
  
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    navigate('/menu');
  };
  
  return (
    <div className="min-h-screen bg-peach-cream p-4">
      <div className="max-w-md mx-auto pt-20">
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg">
            <span className="text-2xl font-display font-bold text-peach-cream">TAB</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Take A Bowl
          </h1>
          {tableNumber && (
            <p className="text-secondary text-lg">
              Table {tableNumber}
            </p>
          )}
        </div>
        
        <Card className="shadow-xl border-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-center mb-6 text-primary">
              {t('selectLanguage')}
            </h2>
            
            <div className="space-y-3">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  variant={language === lang.code ? "default" : "outline"}
                  className="w-full h-14 text-lg justify-start gap-4"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
